import { type ICustomErrorResponse } from '../../common/interfaces'
import { type Request, type Response, type NextFunction } from 'express'

import Unauthorized from '../../responses/clientErrors/Unauthorized'
import BadRequest from '../../responses/clientErrors/BadRequest'
import NotFound from '../../responses/clientErrors/NotFound'
import InternalServer from '../../responses/serverErrors/InternalServer'
import UnprocessableEntity from '../../responses/clientErrors/UnprocessableEntity'
import Forbidden from '../../responses/clientErrors/Forbidden'

export default (err: Error | ICustomErrorResponse, req: Request, res: Response, next: NextFunction): Response | undefined => {
  if (
    err instanceof Unauthorized ||
    err instanceof BadRequest ||
    err instanceof NotFound ||
    err instanceof Forbidden ||
    err instanceof Unauthorized ||
    err instanceof UnprocessableEntity ||
    err instanceof InternalServer
  ) {
    return reportCustomError(err, res)
  }

  next(err)
}

const reportCustomError = (err: ICustomErrorResponse, res: Response): Response => {
  const { errorCode = 500 } = err
  return res.status(errorCode).json({
    type: err.errorDescription,
    message: err.errorMessage
  })
}
