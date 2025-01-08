import random
import json
import os

# Check if the file exists
file_path = r"C:\Users\A\Documents\confidential\backend\namelist.txt"  # Use raw string to avoid escape issues

# Debugging: Print current working directory and list files
print("Current Working Directory:", os.getcwd())
print("Files in the current directory:", os.listdir())

if not os.path.exists(file_path):
    print(f"Error: File '{file_path}' not found. Please ensure the file exists in the correct directory.")
    exit(1)  # Exit the script if the file is not found

# Read the names and meanings from namelist.txt
try:
    with open(file_path, "r", encoding="utf-8") as file:  # Specify UTF-8 encoding
        lines = file.read().splitlines()
except Exception as e:
    print(f"Error reading file: {e}")
    exit(1)  # Exit the script if there's an error reading the file

# Process the names and meanings
name_data = []
for line in lines:
    # Split each line into name and meaning
    name_meaning = line.split(" = ")
    
    # Check if the line is valid (has both name and meaning)
    if len(name_meaning) == 2:
        name = name_meaning[0].strip()
        meaning = name_meaning[1].strip()
        
        # Add random frequency and create the name entry
        name_data.append({
            "name": name,
            "meaning": meaning,
            "frequency": random.randint(1000, 200000)
        })

# Save the data to a JSON file
output_file = "namelist.json"
try:
    with open(output_file, "w", encoding="utf-8") as json_file:  # Specify UTF-8 encoding for writing
        json.dump(name_data, json_file, indent=4)
    print(f"Converted {len(name_data)} names into '{output_file}'")
except Exception as e:
    print(f"Error saving JSON file: {e}")