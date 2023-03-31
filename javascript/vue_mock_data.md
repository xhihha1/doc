
vue.config.js

        module.exports = {
        devServer: {
            before(app) {
            app.get('/api/items', (req, res) => {
                const items = [
                { id: 1, name: 'Item 1', description: 'Description 1' },
                { id: 2, name: 'Item 2', description: 'Description 2' },
                { id: 3, name: 'Item 3', description: 'Description 3' },
                ];

                res.json(items);
            });
            },
        },
        };

In this example, we define a mock API server that responds to a GET request to /api/items by returning an array of objects representing items.  