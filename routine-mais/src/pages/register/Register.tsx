import { Box, Button, Flex, Input, Heading} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../App.css";
import { api } from "../../services/api";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

	const navigate = useNavigate();

  const handleRegister = async () => {
		try {
			await api.post("auth/register", {
				nome,
				email,
				senha,
			});
      console.log("deu certo"); 

			navigate("/");
		} catch (error: any) {
      console.log("error.message");
		}
	};


  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="linear-gradient(
        to top right,
        #f48fb1,  
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
          Cadastro
        </Heading>

        <FormControl mb={4} isRequired>
          <FormLabel color="var(--secondary)">Nome</FormLabel>
          <Input
            mb={3}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como você gostaria de ser chamado?"
            borderColor="var(--purple-light)"
            _focus={{ borderColor: "var(--purple)" }}
          />
        </FormControl>

        <FormControl mb={4} isRequired>
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

        <FormControl mb={6} isRequired>
          <FormLabel color="var(--secondary)">Senha</FormLabel>
          <Input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            borderColor="var(--purple-light)"
            _focus={{ borderColor: "var(--purple)" }}
          />
        </FormControl>

        <Button
          w="full"
          onClick={handleRegister}
          backgroundColor="var(--accent)"
          color="white"
          mt={3}
          _hover={{ backgroundColor: "var(--orange)" }}
        >
          Cadastrar
        </Button>
      </Box>
    </Flex>
  );
};

export default Register;
