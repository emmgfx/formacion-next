export const getWhiteLabel = async (domain) => {
  console.log("reading white label");
  const whiteLabelRequest = await fetch(
    `${process.env.NEXT_PUBLIC_OC_APIURL}/wl/domain?domain=${domain}`,
    { headers: { Authorization: `Bearer E9s3jxBgqu3MrepxpyUaGtPmmFNVEUBJ` } }
  ).then((res) => res.json());
  return whiteLabelRequest.message[0];
};
