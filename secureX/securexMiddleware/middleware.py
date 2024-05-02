import requests
from django.http import HttpResponseForbidden

FORBIDDEN_TYPES = {'proxy', 'vpn'}  # Types to block
FORBIDDEN_COUNTRIES = {'CN', 'RU'}  # Forbidden countries

class BotDetectionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip_address = request.META.get('REMOTE_ADDR')
        print(ip_address)
        url = f'https://api.ipdetective.io/ip/{ip_address}?info=true'
        headers = {'x-api-key': '7956e3ed-c889-4c50-b7d0-8f05424d6630'}
        response = requests.get(url, headers=headers)
        print(response.json())
        if response.ok:
            data = response.json()
            ip_type = data.get('type', '')
            country_code = data.get('country_code', '')

            if ip_type in FORBIDDEN_TYPES:
                return HttpResponseForbidden(f'Access Denied: {ip_type} detected')
            
            if country_code in FORBIDDEN_COUNTRIES:
                return HttpResponseForbidden(f'Access Denied: Request from forbidden country')
        
        return self.get_response(request)
