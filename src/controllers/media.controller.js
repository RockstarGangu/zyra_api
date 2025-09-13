import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/i3prnuncb/",
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const imagekitAuthParams = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    const authParams = await imagekit.getAuthenticationParameters();
    return res.status(200).json({ ...authParams });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { imagekitAuthParams };