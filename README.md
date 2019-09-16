
##TODO

1. Style Article details page
2. Improve paginator & use https://react-bootstrap.github.io/components/pagination/ instead of ButtonGroup
3. Add proptypes

###NOTES
WIKI API for fetching articles has not `skip` option. We need to use `rccontinue` date to request recent changes after that date. So after each request, I store this in redux and use in future requests.

### Integration Tests

[selenium-webdriver](https://seleniumhq.github.io/selenium/docs/api/javascript/) is used for integration tests.
To run it:

1.  download [Chrome webdriver](http://chromedriver.storage.googleapis.com/index.html) for your Chrome/OS
2.  add path to this Chrome webdriver to your OS

    for MacOS: `PATH=$PATH:$HOME/chrome_drivers`
    
    for Windows: [tutorial](https://docs.alfresco.com/4.2/tasks/fot-addpath.html)
    
In the project directory, you can run:


#### How to run tests 
### `node src/integration.test.js`
