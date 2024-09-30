import requests
from collections import Counter
import csv
import KEY_API as P

# Set your API key and base URL
API_KEY = P.API_KEY
BASE_URL = 'https://api.setlist.fm/rest/1.0'

# Set headers with API key and accept JSON response
headers = {
    'x-api-key': API_KEY,
    'Accept': 'application/json'
}

# Grimes' correct MusicBrainz ID (MBID)
grimes_mbid = '7e5a2a59-6d9f-4a17-b7c2-e1eedb7bd222'

# Function to fetch all setlists for the artist using pagination
def fetch_all_setlists(artist_mbid):
    setlists = []
    page = 1
    total_pages = 1  # Will be updated after the first request

    while page <= total_pages:
        url = f'{BASE_URL}/artist/{artist_mbid}/setlists?p={page}'
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            setlists.extend(data['setlist'])
            total_pages = int(data['total'] / 20) + 1  # Update total pages based on the total count
            page += 1
        else:
            print(f"Error fetching data: {response.status_code}")
            break

    return setlists

# Function to extract songs from setlists
def extract_songs(setlists):
    songs = []
    for setlist in setlists:
        if 'sets' in setlist and 'set' in setlist['sets']:
            for set_item in setlist['sets']['set']:
                for song in set_item.get('song', []):
                    songs.append(song['name'])
    return songs

# Fetch all setlists and count the most played songs
setlists = fetch_all_setlists(grimes_mbid)
songs = extract_songs(setlists)
most_played_songs = Counter(songs).most_common()

# Save the data to a CSV file
csv_file = 'grimes_most_played_songs.csv'

with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["Song", "Count"])  # Header row
    writer.writerows(most_played_songs)  # Write each song and its count

print(f"Data has been saved to {csv_file}")

