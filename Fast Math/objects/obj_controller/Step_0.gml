if (alpha > 0) {
	alpha -= 0.01
} else if (page < array_length(text) - 1) {
	alpha = 2
	page += 1
}