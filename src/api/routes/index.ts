import { Router } from 'express';

import main from '../controllers/main';

const router = Router();

router.post('/collections', main.collections);
router.post('/documents', main.documents);

export = router;
