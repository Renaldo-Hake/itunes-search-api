// Requirements
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Global variable
const content = JSON.parse(fs.readFileSync('../Backend/items.json'));

const generateId = () => {
    return Math.floor(Math.random() * Date.now());
}

console.log(content);
// ROUTES
// GET
router.get('/api', (req, res) => {
    res.send(content);
})

// POST
router.post('/create', (req, res) => {
    const id = generateId();
    const newProject = Object.assign({id}, req.body);

    content.push(newProject);

    // add new content to project.json
    fs.writeFileSync('items.json', `${JSON.stringify(content)}`, (err) => {
        if (err) throw err;
        res.send(`New item created`);
    });

    // write this to the db.json file 
    res.send({
        'message': `new project added id: ${id}`,
        content
    });
})

// DELETE
router.delete('/delete/:id', (req, res) => {
    const id = Number(req.params.id);

    for(let i = 0; i < content.length; i++){
        if(content[i].id === id){
            content.splice(i, 1);
        }
    }

    // Delete and save changes
    fs.writeFileSync('items.json', `${JSON.stringify(content)}`, (err) => {
        if (err) throw err;
        res.send(`New item created`);
    });
    
    // Display new content 
    res.json({
        'message': 'Item deleted',
        content
    });
})

// Export 
module.exports = router;