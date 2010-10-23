**MooCS** "Mooks": A JavaScript application interface layer for the BCS series of automation controllers.
===============================================================================================
The BCS series of automation controllers are produced by [Embedded Control Concepts][ecc]. They provide a robust platform for network addressable process automation for the hobbyist, or more commonly, the home brewer. The controllers provide an HTTP GET/POST based API for 3rd party software development and extension.

This project aims to extend that API into a JavaScript framework for interfacing with the controller. Since the included software is designed specifically with the home brewer in mind, this project aims to fill a different role: *to provide an easy to use interface layer enabling rapid development and deployment of custom applications on the platform*.

How I Got Here
--------------
As an avid home brewer, I initially purchased a BCS controller in 2009. I found the platform to be extremely stable, and it inspired me to look beyond it's intended purpose. I'm a professional javascript application developer by trade, so I got excited about the opportunity to extend the BCS API into a technology I'm more familiar with. Long term, I hope this platform will enable me to deploy the BCS controllers for a variety of uses outside the brewery, including home automation, solar energy system control, and so forth.

[ecc]: http://www.embeddedcontrolconcepts.com