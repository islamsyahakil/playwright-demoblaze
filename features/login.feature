Feature: Sign-Up and Login

  Scenario: Sign-Up and Login for the First time
    Given I open the homepage
    When I sign up a new user
    And I log in with that user
    Then I should see the welcome message with that username
