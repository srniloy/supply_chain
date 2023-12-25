Supply Chain Data Transmission Process


Steps:
  1. Create a 32bit hex key which will be available in both customer and supplier end.
  2. Customer ➡️ get data ➡️ encrypt data using the key (AES Encryption)➡️ Hash the data (md5) ➡️ (encrypted+hashed data ) send to supplier/admin.
  3. Supplier received encrypted data ➡️ decrypt using the key ➡️ get decrypted data () ➡️ generate hash code and compare it with received hash code to check the authenticity.


Video Link: https://drive.google.com/drive/folders/1Akt7zMDACfsytwGiVaNutgju7Fo23kTV?usp=sharing

Live Preview: https://supply-chain-two.vercel.app/
