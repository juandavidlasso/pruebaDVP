import { createApp } from './app';
import { connectDB } from './database';
import './database/associations';

(async () => {
    await connectDB();
    const app = await createApp();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}/graphql`);
    });
})();
