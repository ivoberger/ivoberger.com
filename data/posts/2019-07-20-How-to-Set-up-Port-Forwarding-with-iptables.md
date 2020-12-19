---
title: "How to Set up Port Forwarding with iptables"
description: "A quick guide on simple port-forwarding using NAT and DNAT in iptables"
date: 2019-07-20 15:40:00
slug: port-forwarding-with-iptables
tags:
  - networking
  - guide
cover: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8"
---

If you have a server on a private network and need to access it from the outside (but can't simply give it an external IP) you can use port forwarding on an externally accessible server to get around it. Once set up it simply sends all incoming packets that meet certain criteria to a new IP. That way you can connect to a public server in order to communicate with the private server.

## Setup

All following steps need the to be done on the externally accessible machine and need to be run as with root privilege's. I'll assume a scenario where you want to access an internal server with an _internal_ IP `10.0.0.1` on port `80` through a server with an _external_ IP `32.0.0.1` on port `8080` using TCP.

First we need to allow forwarding on the kernel level as this is usually disabled by default. Open `/etc/sysctl.conf` with your favorite editor (and root priviliges) and uncomment the line `net.ipv4.ip_forward=1`. Now run

    sudo sysctl -p
    sudo sysctl --system

to apply the setting.

The forwarding rule itself can be added as follows:

    iptables -t nat -A PREROUTING -p tcp -d 32.0.0.1 --dport 8080 -j DNAT --to-destination 10.0.0.1:80

Let's break that down. `-t nat` tells iptables that we want to work on the Network Address Translation (NAT) table. We add our rule to the `PREROUTING` chain as we want to re-route packets and select them based on protocol (`-p tcp`), destination (`-d 32.0.0.1`) and port (`--dport 8080`). We specify that we want to apply Destination NAT (DNAT) to the selected packets (`-j DNAT`) and of course the target IP and port with `--to-destination 10.0.0.1:80`.

If you only care about the port because the public server has multiple IPs and you want the rule to work for all of them simply omit `-d 32.0.0.1`.

Now that all incoming traffic will be re-routed we just need to tell iptables to change the source address in the re-routed packages. If we don't the target server will think they came from our local machine directly and try to respond directly which doesn't sit well with TCP. To do that we need to run the following:

    iptables -t nat -A POSTROUTING ! -s 127.0.0.1 -j MASQUERADE

Now iptables will rewrite the origin of the re-rerouted packages so the target server will answer to the correct machine. I added `! -s 127.0.0.1` to exclude packets originating in `[localhost](http://localhost)` as without it the rule broke DNS resolution to point that `sudo` didn't work properly anymore because it couldn't resolve its own hostname.

## Making it permanent

Iptables doesn't persist rules through restarts on its own. There are packages to take care of that like `iptables-persistent` but that doesn't seem to be available on Ubuntu 18.04 so here's how to do it manually.

The ruleset can be easily saved by running `iptables-save > /etc/iptables.rules` and restored with `iptables-restore < /etc/iptables.rules`. Where you save your rules it up to you.

Previous Ubuntu versions used `ifupdown` for networking which provides simple pre-up and pre-down hooks which are a good place to run the save and restore commands:

    # open the interface definitions
    sudo nano /etc/network/interfaces
    # find your interface and add the following
    pre-up iptables-restore < /etc/iptables.rules
    pre-down iptables-save > /etc/iptables.rules

If your `/etc/network/interfaces` contains

    # ifupdown has been replaced by netplan(5) on this system.  See
    # /etc/netplan for current configuration.
    # To re-enable ifupdown on this system, you can run:
    #    sudo apt install ifupdown

you'll need to use `networkd-dispatcher` as `netplan` [doesn't support hooks](https://netplan.io/faq#use-pre-up-post-up-etc-hook-scripts):

    echo 'iptables-restore < /etc/iptables.rules' | sudo tee /etc/networkd-dispatcher/routable.d/50-iptables-restore
    echo 'iptables-save > /etc/iptables.rules' | sudo tee /etc/networkd-dispatcher/off.d/50-iptables-save

The save on `pre-down` and in `off.d` hooks is optional, it's actually safer to leave it out in case you mess something up. That way you can just restart and have the old (working) ruleset running again.

And that's it, now you have a port-forwarding setup that is persistent through reboots and doesn't break DNS resolution!
