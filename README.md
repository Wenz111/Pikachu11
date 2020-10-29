# Pikachu11 Discord Bot
Pikachu11 is a Discord Bot which acts as a playground for experimenting with Artificial Intelligence and Image Recognition.

## AI Project #1 - Chili Grading
  <p>
    Chili image data set are taken from the AGTECH Hackathon hosted by MDEC.<br />
    The Chili grading category are divided into 6 category, that is:<br />
  </p>
  <ol>
    <li>Grade A - Ripe</li>
    <li>Grade A - Not Ripe</li>
    <li>Grade B - Ripe</li>
    <li>Grade B - Not Ripe</li>
    <li>Grade C - Ripe</li>
    <li>Grade C - Not Ripe</li>
  </ol>
<!-- insert screenshot -->

<p>
  The <b>precision, recall and average precision (AP)</b> for this chili grading model is:
</p>
  
  Chili Grading Model |
  --- |
  `Precision: 74.7%` |
  `Recall: 51.2%` |
  `Average Precision (AP): 71.1%` |
<br />

## AI Project #2 - Pneumonia Detection
<p>
  Chest X-ray image data set are taken from Kaggle.<br />
  The Pneumonia detection category are divided into 2 category, that is:<br />
</p>
<ol>
    <li>Normal</li>
    <li>Pneumonia</li>
</ol>
<!-- insert screenshot -->

<p>
  The <b>precision, recall and average precision (AP)</b> for this pneumonia detection model is:
</p>
  
  Pneumonia Detection Model |
  --- |
  `Precision: 93.4%` |
  `Recall: 93.4%` |
  `Average Precision (AP): 96.9%` |
<br />

## How it works
<p>
  The images are trained using Microsoft Azure Custom Vision, then export the model as TensorFlow
  and perform all the function in JavaScript.js on Node.js.<br /><br />
  Since the images are trained using "quick train", the free training service without incurring actual charges, the <b>precision, recall and average precision (AP)</b>
  are highly affected, which results in an inaccurate and sometimes wrong predictions of the actual predictions of a user's image.
</p>
