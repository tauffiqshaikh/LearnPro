import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("tauffiq");
  const [email, setEmail] = useState("tfq1234@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      console.log("RESPONSE RECIEVED", data);
      toast("Registered Successfully! Please login");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary">Register</h1>

      <div className="container col-md-4 offset-md-4 pb-5 ">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />

          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-primary col-12 p-2 "
            disabled={!name || !password || !email || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <p className="text-center p-3">
          Already registered?{" "}
          <Link href="/login">
            <a>Login</a>
          </Link>{" "}
        </p>
      </div>
    </>
  );
};

export default Register;
