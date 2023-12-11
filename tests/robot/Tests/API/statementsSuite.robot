*** Settings ***
Documentation    This test suite contains tests for statements API.

Resource    ../../CommonKeywords/CommonFunctions.resource
Resource    suiteKeywords.resource

Suite Setup    Initialize Session

Test Tags    API    statementsAPI


*** Test Cases ***
Get All Statements
    [Documentation]    Sends a GET request to statements api and checks 12 statement categories
    ...                and 6 statements in each category are returned in json format.
    ${categories}=    Send Get Request    statementsApi
    Check Response Status Is Correct    ${categories.status_code}    200
    Check Correct Amount Of List Items Is Returned    ${categories.json()}

    ${no_of_categories}=    Get Length    ${categories.json()}
    FOR    ${index}    IN RANGE    ${no_of_categories}
        ${category}=    Set Variable   ${categories.json()[${index}]}
        Check Correct Amount Of List Items Is Returned    ${category['statements']}
    END

Get First Statement
    [Documentation]    Fetches the first statement that is used for this test suite.
    ${ALL_STATEMENTS}=    Send Get Request    statementsApi
    Set Suite Variable    ${ALL_STATEMENTS}
    ${FIRST_CATEGORY}=    Get Item Of Json By Index    ${ALL_STATEMENTS.json()}    0
    Set Suite Variable    ${FIRST_CATEGORY}
    ${FIRST_STATEMENT}=    Set Variable    ${FIRST_CATEGORY['statements'][0]}
    Set Suite Variable    ${FIRST_STATEMENT}

Statement Can Be Modified
    # robocop: disable=0505
    [Documentation]    Checks that a statement can be modified.
    ${first_statement_copy}=    Copy Dictionary    ${FIRST_STATEMENT}
    ${first_category_copy}=    Copy Dictionary    ${FIRST_CATEGORY}
    ${all_statements_copy}=    Copy List    ${ALL_STATEMENTS.json()}
    ${new_json}=    Modify Json    ${first_statement_copy}    statement    test
    Set Updated Item To List    ${new_json}    ${first_category_copy['statements']}    0
    Set Updated Item To List    ${first_category_copy}    ${all_statements_copy}    0
    ${response}=    Send Put Request    statementsApi    ${all_statements_copy}
    Check Response Status Is Correct    ${response.status_code}    200

    ${updated_statements}=    Send Get Request    statementsApi
    Check Object Was Updated    ${updated_statements.json()[0]['statements'][0]['statement']}    test
    ${initial}=    Modify Json    ${first_statement_copy}    statement    ${FIRST_STATEMENT['statement']}
    Set Updated Item To List    ${initial}    ${first_category_copy['statements']}    0
    Convert List To Initial State    ${ALL_STATEMENTS.json()}    ${FIRST_CATEGORY}    0
    ...                              statements    ${first_category_copy['statements']}    statementsApi

# robocop: enable=0505


*** Keywords ***
Initialize Session
    [Documentation]    Creates API session for tests.
    Create Session    statementsApi    ${STATEMENTSAPI}
