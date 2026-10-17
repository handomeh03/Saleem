export interface IVisitFetchStratgy {
 fetchVisits(
    userId: number,
    userRole: string,
    search?: string,
    year?: number,
    month?: number,
    page?: number,
    limit?: number,
  ): Promise<any>;
}