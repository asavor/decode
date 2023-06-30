export interface ShareResponse {
  data: sharePayloadData;
  error: string;
  message: string;
}
export interface sharePayloadData {
  created_at: number;
  payload: string;
  decode: boolean;
  is_owner: boolean;
}
