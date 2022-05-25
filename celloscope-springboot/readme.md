# CURL commands for testing api

## User Registration

	curl --location --request POST 'http://localhost:8787/api/v1/user/save' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	    "id" : 1,
	    "userId" : "mehedi01",
	    "password" : "123",
	    "mobile" : "01835233447"
	}'
	
## User Login
	
	curl --location --request POST 'http://localhost:8787/api/v1/login' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	    "userId" : "mehedi01",
	    "password" : "123"
	}'
	
## User UserId Check

	curl --location --request POST 'http://localhost:8787/api/v1/user/forgetPass' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	    "userId" : "mehedi01"
	}'

## Reset Password

	curl --location --request POST 'http://localhost:8787/api/v1/user/reset' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	    "userId" : "mehedi01",
	    "password" : "123"
	}'
