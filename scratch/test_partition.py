import sys, json

sys.stdout.reconfigure(encoding='utf-8')

# Check how 250 questions partition into 10 sets
# Chapter distribution in 250 questions:
# Ch1 (Quy tắc): 100 questions (80 regular, 20 paralyzed)
# Ch2 (Văn hóa): 10 questions (IDs 101..110)
# Ch3 (Kỹ thuật): 15 questions (IDs 111..125)
# Ch4 (Biển báo): 90 questions (IDs 126..215)
# Ch5 (Sa hình): 35 questions (IDs 216..250)

# In each set of 25 questions:
# - 1 or 2 paralyzed questions (total 20 paralyzed / 10 sets = 2 paralyzed per set)
# - 8 regular Ch1 questions (80 / 10 = 8)
# - 1 Ch2 question (10 / 10 = 1)
# - 1 or 2 Ch3 questions (15 / 10 = 1.5)
# - 9 Ch4 questions (90 / 10 = 9)
# - 3 or 4 Ch5 questions (35 / 10 = 3.5)
# Total per set: 2 + 8 + 1 + 1 (or 2) + 9 + 4 (or 3) = 25 questions!
# 10 sets * 25 = 250 questions EXACTLY! Every single question in the 250 bank is covered with ZERO overlap!

print("Exam set partition calculation: 25 questions x 10 sets = 250 questions.")
