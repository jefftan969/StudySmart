# Tartanhacks2020

## Inspiration
As students at CMU, we always had a hard time finding out places to work. There's no sense in walking across campus to your favorite spot and finding that it's filled to the brim with students (looking at you, Sorrells). Not only that, but most students know the feeling of walking in circles around your favorite studying spots, hoping for a good place to sit down and work. Because of this, we wanted to make a way for students to easily check which locations were available to study in around campus. It will also save them the time of needing to walk around campus for upwards of 15 minutes just to find a good spot.

## What it does
This website aggregates data based on the number of people that are connected to the Wifi in a given location. It then lets you know how many people are in the area and whether this is a high enough percentage to avoid the study location. You can access this website from the comfort of your own room, so you don't have to walk to campus in order to find a good place to get work done.

## How we built it
The main issue we ran into is how to effectively determine how many people are in a room. Of course, cameras or other sensors could work; however, it would be expensive. We decided to use a new approach that takes use of the fact that most CMU students have a device on them, that is constantly beaming packets to CMU-SECURE. We used a program called Kismet that puts the wifi card of a Raspberry Pi into monitor mode. This allows the Pi to scan packets sent by nearby devices and determine how many unique devices are in the room. We set up a few of these 'nodes,' which all talk to a central server on Microsoft Azure. Running in Flask, the webserver combines data from all the different nodes and displays on a map which study spaces are more/less crowded.

## Challenges we ran into
We mainly ran into challenges with working with SVG, which allow us to turn pixelated images of CMU maps into vectors such that we can manipulate them.

## What's next for StudySmart
The next step that we wanted to take is to make the app more customized. We know that not all students like to study in the obvious locations, so we wanted to allow users to input in their own most used locations, even if they weren't the ones that we were inputting in this base model. That way, you don't have to look at any locations other than the ones you already know and love. We would also like to do more with the data that we collect, by predicting the popularity of different study spaces at CMU on specific days of the week, and at specific times.