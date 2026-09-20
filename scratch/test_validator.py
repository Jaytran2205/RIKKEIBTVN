import sys

def simulate_validator(name, r_list, g_list, b_list):
    total = len(r_list)
    total_sat = 0
    high_sat_count = 0
    paper_count = 0
    ink_count = 0

    for r, g, b in zip(r_list, g_list, b_list):
        mx = max(r, g, b) / 255.0
        mn = min(r, g, b) / 255.0
        l = (mx + mn) / 2.0
        s = 0.0
        if mx != mn:
            s = (mx - mn) / (2.0 - mx - mn) if l > 0.5 else (mx - mn) / (mx + mn)
        total_sat += s
        
        # High saturation (vivid colors like red clothes, green trees, blue sky)
        if s > 0.35 and 0.15 < l < 0.85:
            high_sat_count += 1
            
        gray = 0.299 * r + 0.587 * g + 0.114 * b
        if gray > 140 and s < 0.25:
            paper_count += 1
        elif gray < 85:
            ink_count += 1

    avg_sat = total_sat / total
    paper_ratio = paper_count / total
    high_sat_ratio = high_sat_count / total

    print(f"=== {name} ===")
    print(f"Avg Saturation: {avg_sat:.2f}")
    print(f"Paper Ratio:    {paper_ratio:.2f}")
    print(f"High Sat Ratio: {high_sat_ratio:.2f}")

    is_valid = not (high_sat_ratio > 0.20 or avg_sat > 0.25 or paper_ratio < 0.35)
    print(f"RESULT: {'VALID EXAM PAPER' if is_valid else 'REJECTED (NOT AN EXAM PAPER)'}\n")
    return is_valid

# Test 1: User's photo (Red shirts, trees, blue sky, bronze statue)
# Samples with vivid red (220, 40, 40), green (40, 150, 40), blue sky (100, 180, 240), bronze (190, 140, 50)
user_r = [220, 210, 40, 50, 100, 120, 190, 180, 70, 80] * 10
user_g = [40, 35, 150, 140, 180, 190, 140, 130, 80, 90] * 10
user_b = [40, 30, 40, 35, 240, 245, 50, 45, 90, 100] * 10
simulate_validator("User Photo (Workers in front of Buddha statue)", user_r, user_g, user_b)

# Test 2: Real exam paper (White notebook paper with black/blue pen)
# Samples with mostly white (245, 245, 245), off-white (235, 235, 230), and blue/black pen (20, 30, 60), (30, 30, 30)
exam_r = [245, 240, 235, 248, 250, 242, 238, 20, 30, 245] * 10
exam_g = [245, 240, 235, 248, 250, 242, 238, 30, 30, 245] * 10
exam_b = [245, 240, 230, 248, 250, 240, 235, 60, 30, 245] * 10
simulate_validator("Real Exam Paper (Handwritten on white paper)", exam_r, exam_g, exam_b)
