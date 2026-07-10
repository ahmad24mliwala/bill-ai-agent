import api from "./client";

export async function uploadInvoice(
  firmId: string,
  file: File
) {
  const formData = new FormData();

  formData.append(
    "firm_id",
    firmId
  );

  formData.append(
    "file",
    file
  );

  const response = await api.post(
    "/invoices/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
}
