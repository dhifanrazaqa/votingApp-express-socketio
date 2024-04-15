import { Router } from 'express'

const router: Router = Router()

router.get('/vote/joined')
router.post('/vote/:id/join')
router.delete('/vote/:id/leave')

export default router
