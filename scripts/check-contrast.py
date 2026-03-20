def relative_luminance(hex_color):
    hex_color = hex_color.lstrip('#')
    rgb = [int(hex_color[i:i+2], 16) / 255.0 for i in (0, 2, 4)]
    
    def adjust(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    
    r, g, b = [adjust(c) for c in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast_ratio(hex1, hex2):
    l1 = relative_luminance(hex1)
    l2 = relative_luminance(hex2)
    bright = max(l1, l2)
    dark = min(l1, l2)
    return (bright + 0.05) / (dark + 0.05)

brand_gold = "#b68f49"
brand_cream = "#FAF7F2"

ratio = contrast_ratio(brand_gold, brand_cream)
print(f"Current Ratio (Gold {brand_gold} on Cream {brand_cream}): {ratio:.2f}")

# Find a darker gold that hits 4.5:1
# Let's try to darken #b68f49
import colorsys

def hex_to_rgb(hex):
    hex = hex.lstrip('#')
    return tuple(int(hex[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(int(rgb[0]), int(rgb[1]), int(rgb[2]))

r, g, b = hex_to_rgb(brand_gold)
h, l, s = colorsys.rgb_to_hls(r/255, g/255, b/255)

print("\nSearching for darker variants...")
for light_mod in range(1, 40):
    new_l = max(0, l - (light_mod / 100))
    nr, ng, nb = colorsys.hls_to_rgb(h, new_l, s)
    new_hex = rgb_to_hex((nr*255, ng*255, nb*255))
    new_ratio = contrast_ratio(new_hex, brand_cream)
    if new_ratio >= 4.5:
        print(f"FOUND: {new_hex} provides ratio {new_ratio:.2f} (Lightness reduced by {light_mod}%)")
        break
    # print(f"Try {new_hex}: {new_ratio:.2f}")
