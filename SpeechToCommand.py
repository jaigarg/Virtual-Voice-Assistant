from flask import Flask
from flask import jsonify
import nltk
import speech_recognition as sr
from nltk.tokenize import WhitespaceTokenizer
nltk.download('averaged_perceptron_tagger')


app = Flask(__name__)


@app.route('/speechTotext/', methods=['GET', 'POST'])
def speechToText():
    r = sr.Recognizer()
    possible_commands = ['search', 'filter', 'switch', 'open', 'go']
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source, duration=0.1)
        print('Please Start Speaking')
        audio_command = r.listen(source)
        print('Done')
        app.logger.info('Done')
        try:
            text = r.recognize_google(audio_command, show_all=False)
            print(text)
        except:
            return "Didn't catch that!! Try Again"
        tokens_positions = list(WhitespaceTokenizer().span_tokenize(text))
        tokens = WhitespaceTokenizer().tokenize(text)
        tokens = nltk.pos_tag(tokens)
        command = ""
        keywords = []
        text, _ = tokens[0]
        if text.lower() not in possible_commands:
            return "Invalid Command", 405
        if text == 'Search' or text == 'search':
            command, _ = tokens[0]
            for i in range(1, len(tokens)):
                text, tag = tokens[i]
                print(text, tag)
                if tag == "NNP":
                    keywords.append(text)
        else:
            command, _ = tokens[0]
            for i in range(1, len(tokens)):
                text, tag = tokens[i]
                print(text, tag)
                if tag == "NN" or tag == "JJ":
                    keywords.append(text)
    keyword = ' '.join([str(elem) for elem in keywords])
    if command == "" or keyword == "":
            return "Invalid Command", 405
    return jsonify({'command': command,
                    'keyword': keyword})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)