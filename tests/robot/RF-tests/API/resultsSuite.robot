# *** Settings ***
# Documentation    This test suite contains tests for results API.

# Resource    ../../RF-keywords/CommonFunctions.resource
# Resource    suiteKeywords.resource
# Resource    ./resources/resourcejson.resource

# Suite Setup    Initialize Session

# Test Tags    API    resultsAPI


# *** Test Cases ***
# Get All Results
#     [Documentation]    Sends a GET request to results api and checks 13 results are
#     ...                returned in json format.
#     ${response}=    Send Get Request    resultsApi
#     Check Response Status Is Correct    ${response.status_code}    200
#     Check Correct Amount Of List Items Is Returned    ${response.json()}    13

# Get First Result
#     [Documentation]    Fetches the first result that is used for this test suite.
#     ${ALL_RESULTS}=    Send Get Request    resultsApi
#     Set Suite Variable    ${ALL_RESULTS}
#     ${FIRST_RESULT}=    Get Item Of Json By Index    ${ALL_RESULTS.json()}    0
#     Set Suite Variable    ${FIRST_RESULT}
#     ${FIRST_RESULT_NAME}=    Set Variable    ${FIRST_RESULT['name']}
#     Set Suite Variable    ${FIRST_RESULT_NAME}

# Result Can Be Modified
#     [Documentation]    Checks that a result can be modified.
#     ${first_result_copy}=    Copy Dictionary    ${FIRST_RESULT}
#     ${all_results_copy}=    Copy List    ${ALL_RESULTS.json()}
#     ${new_json}=    Modify Json    ${first_result_copy}    name    test
#     Set Updated Item To List    ${new_json}    ${all_results_copy}    0
#     ${response}=    Send Put Request    resultsApi    ${all_results_copy}
#     Check Response Status Is Correct    ${response.status_code}    200

#     ${updated_results}=    Send Get Request    resultsApi
#     Check Object Was Updated    ${updated_results.json()[0]['name']}    test
#     Convert List To Initial State    ${ALL_RESULTS.json()}    ${FIRST_RESULT}    0
#     ...                              name    ${FIRST_RESULT_NAME}    resultsApi


# *** Keywords ***
# Initialize Session
#     [Documentation]    Creates API session for tests.
#     Create Session    resultsApi    ${RESULTSAPI}
