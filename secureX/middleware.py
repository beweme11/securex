import requests
from django.http import HttpResponseForbidden

FORBIDDEN_TYPES = {'proxy', 'vpn', 'bot'}  # Types to block
FORBIDDEN_COUNTRIES = {'CN', 'RU'}  # Forbidden countries

class BotDetectionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Extract the IP address from the request
        ip_address = request.META.get('REMOTE_ADDR')
        
        # Send a request to the IP detection service
        url = f'https://api.ipdetective.io/ip/{ip_address}?info=true'
        headers = {'x-api-key': '7956e3ed-c889-4c50-b7d0-8f05424d6630'}
        response = requests.get(url, headers=headers)
        
        # Check if the request was successful and if the IP type is forbidden
        if response.ok:
            data = response.json()
            ip_type = data.get('type', '')
            country_code = data.get('country_code', '')

            # Check if the IP type is in the list of forbidden types
            if ip_type in FORBIDDEN_TYPES:
                # If the IP type is forbidden, block the request
                return HttpResponseForbidden(f'Access Denied: {ip_type} detected')
            
            # Check if the country is in the list of forbidden countries
            if country_code in FORBIDDEN_COUNTRIES:
                # If the country is forbidden, block the request
                return HttpResponseForbidden(f'Access Denied: Request from forbidden country')
        
        # Allow the request to proceed
        return self.get_response(request)
