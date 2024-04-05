Solo Project

Technical Challenges

Onboarded two new-to-me front end technologies
vis.gl@react-google-maps
React Router

In order to implement, real time messaging between users, I utilized a conditional recursive setTimeout call within a useEffect hook and a cancelling change within the cleanup statement of the useEffect hook to prevent runaway server requests

on the back end

faced some intersting architectural decisions about whether to make fetch requests 
to the third party FIRMS API from the front end or the backend. The front end option offered the 
temptation of simplicity and development speed, but the downside of less control over the data 
and API rate limits. 

Ultimately I chose the back end route to ensure that all users have access
to a normalized, sanitized and current dataset, as well as the control over the amount of FIRMS API 
calls to maximize data currency without exceeding the rate limits. 




