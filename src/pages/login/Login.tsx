import { Box, Button, Flex, Input, Heading, Text } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import "../../App.css";
import { api } from "../../services/api";

const Login = () => {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [erro, setErro] = useState("");
    const navigate = useNavigate();

	const handleLogin = async () => {
        try {
            // setErro("");
            // const response = await api.post("/auth/login", { email, senha });
			// const token = response.data.token;
			// localStorage.setItem("token", token);
            navigate("/home");
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setErro("Usuário ou senha inválidos.");
            } else {
                setErro("Erro ao tentar fazer login.");
            }
        }
    };

	return (
		<Flex
			minH="100vh"
			align="center"
			justify="center"
			bg="linear-gradient(
            to top right,
            #FF8FAB,  
            #9575cd,  
            #FFE5B4 
            );"
			p={4}
		>
			<Box
				w="100%"
				maxW="400px"
				p={8}
				borderRadius="lg"
				boxShadow="lg"
				bg="white"
			>
				<Heading mb={6} textAlign="center" size="lg" color="var(--cor-roxa)">
					Login
				</Heading>

				<FormControl mb={4}>
					<FormLabel color="var(--secondary)">Email</FormLabel>
					<Input
                        mb={3}
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="seu@email.com"
						borderColor="var(--purple-light)"
						_focus={{ borderColor: "var(--purple)" }}
					/>
				</FormControl>

				<FormControl mb={6}>
					<FormLabel sx={{ color: "var(--secondary)" }}>Senha</FormLabel>
					<Input
						type="password"
						value={senha}
						onChange={(e) => setSenha(e.target.value)}
						placeholder="Digite sua senha"
						borderColor="var(--purple-light)"
						_focus={{ borderColor: "var(--purple)" }}
					/>
				</FormControl>

 				{erro && (
                    <Text color="red.500" fontSize="sm" mt={2}>
                        {erro}
                    </Text>
                )}

				<Button
					w="full"
					onClick={handleLogin}
					backgroundColor="var(--accent)"
					color="white"
                    mt={3}
					_hover={{ backgroundColor: "var(--orange)" }}
				>
					Entrar
				</Button>
                 <Text mt={4} textAlign="center" fontSize="sm" color="gray.600">
                    Não possui cadastro? <Link to="/register">Cadastre-se</Link>
                </Text>
			</Box>
		</Flex>
	);
};

export default Login;
