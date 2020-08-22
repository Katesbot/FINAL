# FINAL

Ashton Preble and Kate Como

Topic: What wine will you enjoy?
Data source: own data; created survey modeled after other similar sine predication type services and additional custom questions

Machine Learning Model: Neural and Logistic

Languages Used: Python, Javascript, SQL

Summary: We would like to develope an app that partners with local wineries to promote wines to a user based on their flavor palate. This dataset does not exist in a publically accessbile manner; as such we developed a survey to generate the dataset ourselves. The survey has been posted on various survey and academic sites to gather data from users all over the world. This data has been collected and cleaned and used to traing multiple machine learning models to predict the type of wine you are most likely to enjoy. 

We used Jupyter Notebooks to pull in the dataset, create and train the model, send the data to SQL database and the save off the model for later use. We utelize a flask-app to connect to the SQL server to pull in data, render the homepage, and make a prediction off user enter data with the model. 

Once a wine type is suggested, we are using Javascrip, Plotly, D3, and other libraries to create visuals about the wine that is being suggested. 

Next Steps: 
Sell advertizements to local wineries
Allow for deeper recommendations beyond Red, White, Rose - but actual varieties of each
Include where to purchase or the best local deals
Save user data such that users can come back and confirm if they liked that wine and add this response to the model to better improve suggestions
