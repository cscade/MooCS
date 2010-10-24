**MooCS** "Mooks": A JavaScript application interface layer for the BCS series of automation controllers.
===============================================================================================
The BCS series of automation controllers are produced by [Embedded Control Concepts][ecc]. They provide a robust platform for network addressable process automation for the hobbyist, or more commonly, the home brewer. The controllers provide an HTTP GET/POST based API for 3rd party software development and extension.

This project aims to extend that API into a JavaScript framework for interfacing with the controller. Since the included software is designed specifically with the home brewer in mind, this project aims to fill a different role: *to provide an easy to use interface layer enabling rapid development and deployment of custom applications on the platform*.

How I Got Here
--------------
As an avid home brewer, I initially purchased a BCS controller in 2009. I found the platform to be extremely stable, and it inspired me to look beyond it's intended purpose. I'm a professional javascript application developer by trade, so I got excited about the opportunity to extend the BCS API into a technology I'm more familiar with. Long term, I hope this project will enable myself and others to deploy the BCS controllers for a variety of uses outside the brewery, including home automation, solar energy system control, and so forth.

The Moving Parts
-----------------
The interface layer is composed of three key parts:

1. A JavaScript global object providing the actual interface to the BCS unit, using AJAX communications
2. The excellent open source [MooTools][moo] JavaScript library
3. A PHP back end script utilizing cURL to communicate with the BCS unit

The GET/POST method the BCS API provides for communication is very well suited to AJAX, and the factory supplied web interface for the unit makes use of AJAX extensively. I wanted to use the same method for this interface layer, but XMLHttpRequest objects are not allowed to communicate outside of the domain of the serving page by the browser. This necessitated the PHP-cURL translation layer to bring the whole thing together: The interface layer communicates with the PHP script, and the PHP script in turn hands off the requests to the BCS unit, and conveys the responses back to the interface layer.

Current Features
----------------
The project is in it's infancy, currently at version 0.1-development. Although I have only just begun, the following features are supported:

* *Queued Requests* - Each request to read data from the BCS device passes through a queue. If a large number of simultaneous requests are made, the BCS unit will not need to deal with them all at once. Each request is dispatched as the previous one returns.
* *Cached Structures* - The BCS API communicates a significant amount of data via structure files. MooCS is aware of which structures contain data that will not change regularly and caches those structures. Requests for data from the unit that MooCS already has a cached copy of will be returned immediately, without communicating with the device a second time. Since the structure files contain a significant amount of data, the *cached structures* feature and the *queued requests* feature work together to make communicating with the device as fast and light as possible.
* *Data Read & Write* - The interface breaks up all of the structures the BCS unit provides into logical categories ready for reading and writing. Rather than speaking in terms of data structures the way the BCS does natively, you can instead use methods like: `BCS.Comm.read('network', 'currentIP');`

[ecc]: http://www.embeddedcontrolconcepts.com
[moo]: http://www.mootools.net