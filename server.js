require('dotenv').config();


const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const Rivet = require('@ironclad/rivet-node');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


// Endpoint to handle button click action.
app.post('/button-click',async (req, res) => {
    try {
        const result = await Rivet.runGraphInFile('./Edwardianiser.rivet-project', {
            graph: 'Edwardianiser',
            inputs: {
                UserInput: req.body.edwardianText,
            },
            openAiKey: process.env.OPENAI_API_KEY,

            
        });
            console.log(req.body.edwardianText);

        console.log(result);
        res.send({ message: result.output.value });
    } catch (error) {
        console.error('Error running the Rivet graph:', error);
        res.status(500).send({ error: 'Failed to process request.' });
    }
});


app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);    
});


