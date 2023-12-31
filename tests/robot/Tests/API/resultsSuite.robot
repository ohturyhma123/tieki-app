# robocop: disable=0505
*** Settings ***
Documentation    This test suite contains tests for results API.

Resource    ../../CommonKeywords/CommonFunctions.resource
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

Add Link To Result
    [Documentation]    Adds a link to result by result id.
    ${results_before}=    Send Get Request    resultsApi
    ${first_result_before}=    Get Item Of Json By Index    ${results_before.json()}    0
    ${first_result_links_before}=    Set Variable    ${first_result_before['links']}
    ${links_before_length}=    Get Length    ${first_result_links_before}

    ${new_link}=    Create Dictionary    description=testi123    link=testi.com
    Send Post Request With Path    session=resultsApi    path=1/links    body=${new_link}

    ${results_after}=    Send Get Request    resultsApi
    ${first_result_after}=    Get Item Of Json By Index    ${results_after.json()}    0
    ${first_result_links_after}=    Set Variable    ${first_result_after['links']}
    ${links_after_length}=    Get Length    ${first_result_links_after}

    Should Be True    ${links_after_length} == ${links_before_length} + 1

Delete Link From Result
    [Documentation]    Deletes a link from result by result id and results links id.
    ${results_before}=    Send Get Request    resultsApi
    ${first_result_before}=    Get Item Of Json By Index    ${results_before.json()}    0
    ${first_result_links_before}=    Set Variable    ${first_result_before['links']}
    ${links_before_length}=    Get Length    ${first_result_links_before}

    Send Delete Result Link Request    session=resultsApi    result_id=1    link_id=34

    ${results_after}=    Send Get Request    resultsApi
    ${first_result_after}=    Get Item Of Json By Index    ${results_after.json()}    0
    ${first_result_links_after}=    Set Variable    ${first_result_after['links']}
    ${links_after_length}=    Get Length    ${first_result_links_after}

    Should Be True    ${links_after_length} == ${links_before_length} - 1

# robocop: enable=0505


*** Keywords ***
Initialize Session
    [Documentation]    Creates API session for tests.
    Create Session    resultsApi    ${RESULTSAPI}
