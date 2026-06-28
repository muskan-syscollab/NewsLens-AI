def classify_news(text):

    text = text.lower()

    if any(word in text for word in [
        "election",
        "government",
        "minister",
        "parliament",
        "politics"
    ]):
        return "Politics"

    elif any(word in text for word in [
        "cricket",
        "football",
        "ipl",
        "sports",
        "match"
    ]):
        return "Sports"

    elif any(word in text for word in [
        "ai",
        "technology",
        "software",
        "python",
        "computer"
    ]):
        return "Technology"

    elif any(word in text for word in [
        "market",
        "stock",
        "economy",
        "business"
    ]):
        return "Business"

    return "General"