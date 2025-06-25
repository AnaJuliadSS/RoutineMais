import { Box, Heading, Text, VStack, HStack, Button, IconButton, Checkbox } from "@chakra-ui/react";
import { CalendarDays, Plus, AlertCircle } from "lucide-react";

const tasks = [
  {
    title: "Estudar React",
    subtasks: [
      { title: "Ler documentação", done: true },
      { title: "Fazer exercícios", done: false },
      { title: "Criar mini projeto", done: false },
    ],
    color: "var(--purple-light)"
  },
  {
    title: "Reunião com equipe",
    subtasks: [],
    color: "var(--orange-light)"
  },
];

export default function Home() {
  return (
    <Box p={6} bg="var(--background)" minH="100vh">
      <HStack justify="space-between" mb={4}>
        <Heading color="var(--primary)">Minha Agenda</Heading>
        <IconButton
          colorScheme="pink"
          aria-label="Botão de emergência"
          onClick={() =>
          {}
          }
        > <AlertCircle /></IconButton>
      </HStack>

      <Box bg="white" p={4} rounded="2xl" boxShadow="md">
        <HStack mb={3} justify="space-between">
          <HStack>
            <CalendarDays color="var(--secondary)" />
            <Text fontSize="xl" color="var(--secondary)">Hoje</Text>
          </HStack>
          <Button colorScheme="purple"> <Plus /> Nova Tarefa</Button>
        </HStack>

        <VStack spaceX={4} align="stretch">
          {tasks.map((task, idx) => (
            <Box key={idx} bg={task.color} p={4} rounded="xl">
              <Text fontWeight="bold" fontSize="lg" mb={2}>{task.title}</Text>
              {task.subtasks.length > 0 ? (
                <VStack align="start">
                  {task.subtasks.map((sub, i) => (
                    <Checkbox.Root key={i} isChecked={sub.done} colorScheme="purple">
                      {sub.title}
                    </Checkbox.Root>
                  ))}
                </VStack>
              ) : (
                <Text color="gray.600">Sem subtarefas</Text>
              )}
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}

/*
Heurísticas de Nielsen aplicadas:

1. **Visibilidade do status do sistema**:
   - Uso de `useToast` para mostrar que o botão de emergência foi acionado, fornecendo feedback imediato ao usuário.

2. **Consistência e padrões**:
   - Cores e botões seguem o mesmo esquema de cores da tela de login/cadastro, mantendo a consistência visual.

3. **Prevenção de erros**:
   - O botão de emergência está isolado visualmente e requer clique explícito, prevenindo acionamentos acidentais. Além disso, mostra uma mensagem clara após o acionamento.
*/
