export interface TypedRequestBody<BodyType> extends Express.Request {
  body: BodyType;
}
