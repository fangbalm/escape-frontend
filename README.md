# escape-frontend
## Description 
A single-use escape room app that requires the user to collect clues around the page in order to successfully leave. 
Frontend utilizes CSS, HTML5, and JavaScript. 
- Created by Jen Tracy & Lucius VanSlyke 

# Instructions to Start 
### Requirements  
 This application utilizes a Rails backend, which can be found here: https://github.com/jtray86/escape-backend 
 - **Database:** Postgresql 
 
Ruby gems required to run: 
- gem 'active_model_serializers'
- gem 'rails', '~> 5.2.1'
- gem 'rack-cors'

### Deployment 
1. ```bundle install``` on your local terminal (ensure postgresql is running on your machine) 
2.  ```rails db:create```
3.  ```rails db:migrate``` 
4.  ```rails db:seed```

### Game Functionality 
Your goal is to move about the page and add the appropriate items to your cart in order to leave the e-commerce hellscape. You have to utilize clues around the page in order to get the appropriate items in your cart and win!

**Credit:** 
Flatiron School - Phase 3 
