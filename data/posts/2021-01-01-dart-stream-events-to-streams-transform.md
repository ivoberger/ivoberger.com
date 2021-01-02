---
title: "Transform each Event of a Dart Stream into a new Stream"
description: "Streams are a powerful way to propagate updates throughout an application. This post explains how to create a stream from every event of an input stream without leaving any dangling subscriptions."
published: 2021-01-01
slug: dart-stream-events-to-streams-transform
tags:
  - dart
  - streams
cover: "https://images.unsplash.com/photo-1547041270-d3d54e1263cb"
---

If you need live updates for anything in your Dart application [Streams](https://api.dart.dev/stable/2.8.4/dart-async/Stream-class.html) are the way to go. They are used for the [BloC architecture](https://pub.dev/packages/bloc), [Cloud Firestore](https://pub.dev/packages/cloud_firestore#usage), [reading large files](https://api.dart.dev/stable/2.8.4/dart-io/File-class.html) and so on.

The [built-in methods](https://api.dart.dev/stable/2.8.4/dart-async/Stream-class.html#instance-methods) already allow for a lot of manipulation such as [de-duping](https://api.dart.dev/stable/2.8.4/dart-async/Stream/distinct.html), [map](https://api.dart.dev/stable/2.8.4/dart-async/Stream/map.html), [join](https://api.dart.dev/stable/2.8.4/dart-async/Stream/join.html) and much more. For use cases beyond these pre-defined methods the [StreamTransformer](https://api.dart.dev/stable/2.8.4/dart-async/StreamTransformer-class.html) class comes into play.

This post will describe how to take a source stream and create a new stream for every event the source emits. One application for this is to combine or rather fill-in data from a Realtime database such as Cloud Firestore.

Imagine an online-shop with an article overview that allows to apply some filters. Changes to the filter setting are propagated as a stream and applied to a database-query which return a stream (to receive updates if data encompassed by this query changes). For every change to the filter you need to do two things:

1. Cancel the subscription to the old query
2. Create a subscription to the new query

But what happens if the user goes to a different page? Now you also need to make sure that cancelling the subscription to the result stream cancels all subscriptions in the chain.

All of the above can be achieved by implementing a custom `StreamTransformer` that takes of updating the data stream and makes sure there aren't any dangling subscriptions left behind and can be reused wherever it's needed.

Now that the stage is set, let's have a look at some code!

First we need class to gold the functionality. This class should extend `StreamTransformerBase` so it can be used with `Stream.transform`. It also needs a function to handle the transform.

```dart
/// S is the type for the source stream, T for the target/result stream
class EventsToStream<S, T> extends StreamTransformerBase<S, T> {
  final Stream<T> Function(S) handleTransform;

  EventsToStream(this.handleTransform);
}
```

Now we need to implement `bind` from `StreamTransformerBase`. First we need a `StreamController` to build our target stream and then two variables to keep track of the source and target subscription:

```dart
@override
Stream<T> bind(Stream<S> source) {
  StreamController<T> controller;
  StreamSubscription sourceSubscription;
  StreamSubscription targetSubscription;
}
```

Next we'll implement the `StreamController`. In the `onListen` function we start listening to the source stream. On every source event the old target subscription needs to be cancelled and then recreated using the `handleTransform` function we got through the constructor earlier. Events and errors from the target stream are simply passed to the respective controller functions. I've chosen to pass all errors from the source stream to the controller as well but you could also drop or log them instead.

Finally we close the controller when the source stream is done and pass through all actions on the controller stream to both source and and target stream. This ensures that all internal subscriptions are cancelled when the end consumer cancels the subscription.

```dart
controller = StreamController(
  onListen: () => sourceSubscription = source.listen(
    (sourceEvent) {
      targetSubscription?.cancel();
      targetSubscription = handleTransform(sourceEvent).listen(
        controller.add,
        onError: controller.addError,
      );
    },
    onError: controller.addError,
    onDone: controller.close,
  ),
  onPause: () {
    sourceSubscription?.pause();
    targetSubscription?.pause();
  },
  onResume: () {
    sourceSubscription?.resume();
    targetSubscription?.resume();
  },
  onCancel: () {
    sourceSubscription?.cancel();
    targetSubscription?.cancel();
  },
);
```

As the last step we just need to return the stream from `bind`, resulting in this class:

```dart
class EventsToStream<S, T> extends StreamTransformerBase<S, T> {
  final Stream<T> Function(S) handleTransform;
  EventsToStream(this.handleTransform);

  @override
  Stream<T> bind(Stream<S> source) {
    StreamController<T> controller;
    StreamSubscription sourceSubscription;
    StreamSubscription targetSubscription;

    controller = StreamController(
      onListen: () => sourceSubscription = source.listen(
        (sourceEvent) {
          targetSubscription?.cancel();
          targetSubscription = handleTransform(sourceEvent).listen(
            controller.add,
            onError: controller.addError,
          );
        },
        onError: controller.addError,
        onDone: controller.close,
      ),
      onPause: () {
        sourceSubscription?.pause();
        targetSubscription?.pause();
      },
      onResume: () {
        sourceSubscription?.resume();
        targetSubscription?.resume();
      },
      onCancel: () {
        sourceSubscription?.cancel();
        targetSubscription?.cancel();
      },
    );

    return controller.stream;
  }
}
```

Now this transformer can simply be used. The following example is based on the scenario described at the beginning of the post: each option of a stream of filter options from the UI needs to be turned into a query with these options applied.

```dart
/// the filter is a simple search term
Stream<String> filterOptions;
/// repository class for product fetching. Each function returns a stream of products
ProductRepository productRepository;

Stream<List<Product>> products;
products = filterOptions.transform(EventsToStream((filter) => productRepository.search(filter)));
// or even shorter
products = filterOptions.transform(EventsToStream(productRepository.search));
```

And that's it. Now we have a stream transform that'll turn every event of a stream into a new stream with a simple transformer function and no dangling subscriptions.

Thanks for reading!
