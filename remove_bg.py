from PIL import Image

def remove_fake_transparency(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        # Check if the pixel is light and grayscale-ish (the checkerboard)
        # Gold is around (210, 160, 40), so its max-min is large
        if max(r, g, b) > 200 and max(r, g, b) - min(r, g, b) < 25:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    input_file = r"C:\Users\FA23-BSE-072.cuiwah\.gemini\antigravity\brain\e08265b9-4c8b-4072-ae06-4d6ce1d5280a\media__1787986198820.jpg"
    output_file = r"c:\Users\FA23-BSE-072.cuiwah\Downloads\web_projects\umziotic-brand-build\src\assets\logo.png"
    remove_fake_transparency(input_file, output_file)
    print(f"Saved transparent logo to {output_file}")
