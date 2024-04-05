Solo Project :: FireTower

My project is called FireTower. It is a tool for rural residents to maintain situational awareness during wildfire emergencies. 

The user arrives at a login page and is invited to Sign Up or Login.

When a new user logs in, they will be redirected to the map UI. 

They can first set a home location, which will persist between sessions. 

They can then render fires. This feature leverages near real time data from NASA satellite infrared fire detection tools, available via NASA's Fire Information Resource Management System API. This renders currently detected fires on the Map UI and allows the user to see information about the fires. 

Now I will log in to my personal account to demo a fire emergency. 

In the middle is my account, and on the sides I have logged in to two of my neighbors accounts, Dane and Angela. 

When the user clicks neighbors, neighbor markers appear. 

Now luckily it has been cold and rainy here so there are no fires in my community, but if I click demo fire it will insert a pretend fire into my database. 

So let's say I'm out doing yard work on a hot, dry day and I smell smoke. I can log into the app and see that a fire has been detected in the canyon near my house. If I click on my home marker, an info window opens and allows me to post a message. Other users will see this message attached to my neighbor pin. So lets have Dane say, 'I can see the smoke, but it's blowing away from us.' And then Angela says, 'Cal Fire on site and they have it contained.' With FireTower I have a tool that can help me quickly make critical decisions about whether or not to evacuate my home. 

Now I'll discuss a few interesting technical challenges. 

I onboarded two new-to-me front end libraries. 

The first was the vis.gl React Google Maps library, which allowed me to use a Google Map as a fully controlled reactive component. 

The second was React Router, which I used for front-end page flow management. 

I had to make an interesting design decision early on about whether to fetch the fire data from the FIRMS API from the front end or the back end. I chose the back end in order to make sure that all users are receiving timely, consistent, sanitized data, and to make sure my app could stay within API rate limits at scale. 

The real time messaging was a stretch goal for me. I investigated several fascinating implementation options, but ultimately I utilized a conditional recursive setTimeout call within a useEffect hook and a cancelling change within the cleanup statement to prevent runaway server requests.

That is FireTower. Thank you for listening to my presentation. 






 