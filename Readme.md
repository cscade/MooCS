# MooCS
##A JavaScript application interface layer for the BCS series of automation controllers.

The BCS series of automation controllers are produced by [Embedded Control Concepts][ecc]. They provide a robust platform for network addressable process automation for the hobbyist, or more commonly, the home brewer. The controllers provide an HTTP GET/POST based API for 3rd party software development and extension.

This project aims to extend that API into a JavaScript framework for interfacing with the controller. Since the included software is designed specifically with the home brewer in mind, this project aims to fill a different role: *to provide an easy to use interface layer enabling rapid development and deployment of custom applications on the platform*.

## Getting Started

In order to make use of the library, you wil need:

* A PHP-enabled web server that can reach the BCS over the network. If you are on a mac, the built-in Apache server works fine.

## The Moving Parts

The interface layer is composed of three key parts:

1. A JavaScript global namespace `MooCS` providing the tools to interface to the BCS unit, using AJAX communications
2. The excellent open source [MooTools][moo] JavaScript library
3. A PHP back end script utilizing cURL to communicate with the BCS unit

The GET/POST method the BCS API provides for communication is very well suited to AJAX, and the factory supplied web interface for the unit makes use of AJAX extensively. I wanted to use the same method for this interface layer, but XMLHttpRequest objects are not allowed to communicate outside of the domain of the serving page by the browser. This necessitated the PHP-cURL translation layer to bring the whole thing together: The interface layer communicates with the PHP script, and the PHP script in turn hands off the requests to the BCS unit, and conveys the responses back to the interface layer.

## Current Features

The project is in it's infancy. Although I have only just begun, the following features are supported:

### Please note that the library is currently read-only. I have not had opportunity to get write methods working correctly.

* *Queued Requests* - Each request to read data from the BCS device passes through a queue. If a large number of simultaneous requests are made, the BCS unit will not need to deal with them all at once. Each request is dispatched as the previous one returns.
* *Cached Structures* - The BCS uses structure files which contain a significant amount of data. The *cached structures* feature and the *queued requests* feature work together to make communicating with the device as fast and light as possible, minimizing network traffic and latency when reading consecutive values.
* *Data Read* - The interface breaks up all of the structures the BCS unit provides into logical categories ready for reading. Rather than speaking in terms of data structures the way the BCS does natively, you can instead use methods like: `myDevice.read('network', 'currentIP');`
* *Multiple BCS Support* - The interface layer can support any number of BCS target devices, each having their own instance, queue, cache, etc. It's even possible to mix and match different models of BCS!

How I Got Here
--------------
As an avid home brewer, I initially purchased a BCS controller in 2009. I found the platform to be extremely stable, and it inspired me to look beyond it's intended purpose. I'm a professional javascript application developer by trade, so I got excited about the opportunity to extend the BCS API into a technology I'm more familiar with. Long term, I hope this project will enable myself and others to deploy the BCS controllers for a variety of uses outside the brewery, including home automation, solar energy system control, and so forth.

License
-------
This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. To view a copy of this license, visit [here](http://creativecommons.org/licenses/by-sa/3.0/) or send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.

Contact
-------
Contact [Carson S. Christian][ccmail] with questions or comments.


[ecc]: http://www.embeddedcontrolconcepts.com
[moo]: http://www.mootools.net
[ccmail]: mailto:cc@amplego.com