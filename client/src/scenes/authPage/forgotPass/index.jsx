import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState("")
    const handleSendEmail = async () => {
        const sendEmailRes = await fetch(`http://localhost:3001/auth/forgot-password`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        const res = await sendEmailRes.json()
        if (!res) {
            setMsg(sendEmailRes.message)
        } else {
            setMsg("Reset password link is sent to your email.")
            setTimeout(() => {
                navigate("/home")
            }, 3000);
        }
    }
    return (
        <div>
            <form>
                <TextField fullWidth size="small" type="email" label="" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                {
                    msg !== "" &&
                    <Typography sx={{ textAlign: "center", color: palette.primary.main, p: "1rem 0 0 0" }}>{msg}</Typography>
                }
                <Button fullWidth
                    sx={{
                        m: "1rem 0",
                        p: "0.5rem",
                        backgroundColor: palette.primary.dark,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.dark, background: palette.primary.main },
                    }} onClick={handleSendEmail} >Send Password Reset Link</Button>
            </form>
        </div>
    );
};

export default ForgetPass;