*** Settings ***
Documentation    This test suite contains tests for results API.

Resource    ../../RF-keywords/CommonFunctions.resource
Resource    suiteKeywords.resource

Suite Setup    Initialize Session

Test Tags    API    resultsAPI


*** Test Cases ***
Get All Results
    [Documentation]    Sends a GET request to results api and checks 12 results are
    ...                returned in json format.
    ${response}=    Send Get Request    resultsApi
    Check Response Status Is Correct    ${response.status_code}    200
    Check Correct Amount Of List Items Is Returned    ${response.json()}

Get First Result
    [Documentation]    Fetches the first result that is used for this test suite.
    ${ALL_RESULTS}=    Send Get Request    resultsApi
    Set Suite Variable    ${ALL_RESULTS}
    ${FIRST_RESULT}=    Get Item Of Json By Index    ${ALL_RESULTS.json()}    0
    Set Suite Variable    ${FIRST_RESULT}
    ${FIRST_RESULT_LINK}=    Set Variable    ${FIRST_RESULT['links'][0]}
    Set Suite Variable    ${FIRST_RESULT_LINK}

Result Can Be Modified
    # robocop: disable=0505
    [Documentation]    Checks that a result can be modified.
    ${first_result_copy}=    Copy Dictionary    ${FIRST_RESULT}
    ${first_link_copy}=    Copy Dictionary    ${FIRST_RESULT_LINK}
    ${all_results_copy}=    Copy List    ${ALL_RESULTS.json()}
    ${new_json}=    Modify Json    ${first_link_copy}    description    test
    Set Updated Item To List    ${new_json}    ${first_result_copy['links']}    0
    Set Updated Item To List    ${first_result_copy}    ${all_results_copy}    0
    ${response}=    Send Put Request    resultsApi    ${all_results_copy}
    Check Response Status Is Correct    ${response.status_code}    200

    ${updated_results}=    Send Get Request    resultsApi
    Check Object Was Updated    ${updated_results.json()[0]['links'][0]['description']}    test
    ${initial}=    Modify Json    ${first_link_copy}    description    ${FIRST_RESULT_LINK['description']}
    Set Updated Item To List    ${initial}    ${first_result_copy['links']}    0
    Convert List To Initial State    ${ALL_RESULTS.json()}    ${FIRST_RESULT}    0
    ...                              links    ${first_result_copy['links']}    resultsApi

# robocop: enable=0505


*** Keywords ***
Initialize Session
    [Documentation]    Creates API session for tests.
    Create Session    resultsApi    ${RESULTSAPI}
