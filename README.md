# Exame Certo - Centralização de Exames e Informações Médicas

## Visão Geral

Exame Certo é uma aplicação web desenvolvida para centralizar exames laboratoriais e informações médicas de pacientes, facilitando o acesso e a análise de dados de saúde ao longo do tempo. A aplicação oferece uma plataforma segura e eficiente onde pacientes podem armazenar, organizar e compartilhar seus dados clínicos com profissionais de saúde.

Este projeto adota uma arquitetura sólida e escalável baseada nos seguintes princípios e padrões de design:

---

### Clean Architecture

A Clean Architecture foi adotada para garantir a separação de responsabilidades entre as camadas da aplicação, tornando o sistema independente de frameworks externos, UI, banco de dados e outras dependências. Com isso, as regras de negócio são mantidas isoladas, permitindo que as funcionalidades sejam facilmente testáveis e escaláveis.

---

### Domain-Driven Design (DDD)

A aplicação utiliza Domain-Driven Design (DDD) para modelar o domínio de forma a refletir fielmente o mundo real. Essa abordagem permite capturar a complexidade do negócio em um modelo de software flexível e compreensível. As entidades, agregados, repositórios e serviços foram projetados para expressar claramente as regras de negócio e o fluxo de trabalho clínico.

---

### Princípios SOLID
Os princípios SOLID são seguidos rigorosamente para garantir que o código seja robusto, flexível e de fácil manutenção:

- **S - Single Responsibility Principle (SRP):**
Cada classe no projeto tem uma responsabilidade única. Por exemplo, a classe PatientService é responsável apenas pela lógica de manipulação e consulta de pacientes, enquanto a classe ExamService trata exclusivamente das operações relacionadas a exames laboratoriais. Isso mantém o código limpo e focado, facilitando sua manutenção e extensão.

- **O - Open/Closed Principle (OCP):**
O projeto foi estruturado de forma que as classes sejam abertas para extensão, mas fechadas para modificação. Um exemplo disso é o uso de interfaces nos repositórios, como IPatientRepository. Se houver a necessidade de alterar a fonte de dados (por exemplo, trocar o banco de dados), podemos criar uma nova implementação da interface sem alterar o código existente, apenas registrando a nova implementação.

- **L - Liskov Substitution Principle (LSP):**
Subtipos são usados de forma que possam substituir seus tipos base sem comprometer a integridade do sistema. Um exemplo é a substituição de repositórios concretos, como PostgresPatientRepository, que pode ser substituído por MongoPatientRepository para consultas, sem a necessidade de mudar a lógica do serviço que os consome. A aplicação pode continuar funcionando corretamente com qualquer subtipo.

- **I - Interface Segregation Principle (ISP):**
Interfaces são desenhadas de forma a não forçar classes a implementarem métodos que não utilizam. No projeto, cada interface foi segregada para comportar apenas as operações necessárias. Por exemplo, a interface IExamRepository define apenas os métodos específicos para manipulação de exames, enquanto IReportRepository lida exclusivamente com relatórios, evitando que os repositórios sejam sobrecarregados com métodos desnecessários.

- **D - Dependency Inversion Principle (DIP):**
As dependências no sistema são invertidas, de modo que os serviços dependem de abstrações e não de implementações concretas. Isso é feito principalmente por meio da injeção de dependência no NestJS, onde serviços como PatientService recebem instâncias de IPatientRepository através de injeção, sem conhecer a implementação concreta. Assim, a camada de domínio permanece desacoplada da camada de infraestrutura, facilitando a troca de implementações (ex: mudar de PostgreSQL para MongoDB) sem modificar o código de negócio.

---

 ## Padrões de Design Aplicados

1. **Repository Pattern:**
    - **Porquê:** Abstrai a persistência de dados, permitindo que o domínio se concentre em regras de negócio, e facilita a troca de tecnologias de banco de dados.
    - **Exemplo:** Utilizamos o Repository Pattern para acessar dados de `Patient`, `Doctor`, `Clinic`, `Anamnesis`, `Report`, `Exam`, em nosso banco de dados PostgreSQL, além de retornar dados pelo MongoDB.
    - **Diagrama:**

2. **Factory Pattern:**
   - Para criar instâncias complexas de objetos de domínio com dependências.

3. **Service Layer:**
   - Encapsula a lógica de aplicação, permitindo que o domínio permaneça focado em suas regras de negócio. Facilita a implementação de use cases que orquestram interações entre as camadas da aplicação.

4. **Event-Driven Architecture:**
   - A arquitetura orientada a eventos permite o processamento desacoplado e assíncrono de dados e eventos externos, como sincronizações com sistemas de terceiros. Utiliza-se o RabbitMQ para gerenciar filas de eventos.

5. **Dead Letter Queues (DLQ):**
   - **Porquê:** As Dead Letter Queues (DLQ) são filas especiais usadas para armazenar mensagens que falharam no processamento ou não puderam ser entregues ao consumidor com sucesso após várias tentativas. Elas são utilizadas para lidar com erros, inconsistências ou problemas temporários no processamento de mensagens.
   - **Exemplo:** No RabbitMQ, você pode configurar uma fila de dead-letter associada a uma fila principal. Quando o processamento de uma mensagem falha (ou atinge um número máximo de tentativas), ela é movida para a Dead Letter Queue, onde pode ser analisada ou processada posteriormente.

6. **Outbox Pattern:**
   - É uma estratégia de design que assegura a consistência entre o estado do banco de dados e a publicação de eventos em sistemas distribuídos. Funciona como uma fila intermediária, onde as mensagens a serem enviadas são armazenadas antes de serem efetivamente publicadas.
   - **Exemplo:** Como o sistema está usando bancos de dados diferentes para comandos e consultas, é importante garantir que os dados de escrita no `PostgreSQL` sejam sincronizados com o MongoDB para leitura.
   O problema que o Outbox Pattern resolve é garantir que tanto os comandos (escrita) quanto a publicação de eventos (`RabbitMQ`) sejam feitos de forma atômica, evitando inconsistências causadas por falhas no meio da operação. Sem o Outbox Pattern, há o risco de salvar dados no banco, mas falhar ao enviar o evento para o `RabbitMQ` (ou vice-versa).
    - - Outbox Pattern pode ser otimizado com o uso de uma fila intermediária como o `Redis`, e o pacote `@nestjs/bullmq` oferece uma excelente solução para gerenciar filas com Redis no `NestJS`, além de possibilitar a criação de produtores, consumidores, e ouvintes de filas de maneira distribuída. Esse setup melhora ainda mais a resiliência e escalabilidade do sistema, especialmente em ambientes onde há múltiplos nós de rede e integração com outras plataformas.
    - - Em vez de apenas salvar os eventos no banco de dados (`PostgreSQL`), usaremos Redis para gerenciar a fila de eventos, e o pacote `@nestjs/bullmq` para produzir e consumir essas mensagens. O Outbox Pattern ainda será aplicado para garantir a consistência atômica entre os eventos no banco de dados e na fila de eventos.
   - - Produtores adicionam eventos à fila `Redis`.
   - - Consumidores processam os eventos da fila `Redis`.
   - - Listeners são usados para capturar eventos de falha ou sucesso.
      

---

## Padrões arquiteturiais 

1. **CQRS:**
   - Para separar as operações de leitura (queries) das operações de escrita (commands) do sistema.
   - RabbitMQ está sendo usado para mensagens
   - **Vantagens:**
   - 1. **Desacoplamento:** RabbitMQ permite que o produtor (quem emite o evento) e o consumidor (quem lida com o evento) sejam completamente desacoplados. A aplicação que escreve dados no PostgreSQL (escrita) não precisa se preocupar com a aplicação que lê e atualiza o MongoDB (leitura).
   - 2. **Escalabilidade:** RabbitMQ permite o processamento assíncrono e paralelo de eventos. Se você precisar processar eventos de forma mais rápida, pode simplesmente adicionar mais consumidores.
   - 3. **Garantia de Entrega:** RabbitMQ suporta várias garantias de entrega, como "at least once" e "exactly once", para que os eventos não sejam perdidos. Isso é essencial para garantir que todos os eventos sejam corretamente consumidos e o MongoDB seja atualizado conforme necessário.
   - 4. **Tolerância a Falhas:** RabbitMQ permite reprocessar eventos caso algum consumidor falhe temporariamente ou haja algum erro no processamento.    

---

### Desafios Identificados

1. **Padrões de Interoperabilidade:** Padrões como HL7, FHIR e DICOM foram investigados para garantir a compatibilidade com sistemas de prontuário eletrônico (EHRs).
2. **Certificação Digital:** Implementação de certificação digital.
3. **ETL:** Processos de ETL para integração com EHRs.
4. **Webhooks:** Recepção de notificações em tempo real.
5. **Segurança e Privacidade dos Dados:** A aplicação emprega criptografia de dados e autenticação multifator (MFA) para proteger informações sensíveis.
6. **Digitalização e Armazenamento de Laudos:** Laudos médicos podem ser digitalizados e convertidos para texto utilizando Tesseract.js, o que facilita a organização e busca dos documentos
7. **Autenticação e Segurança:** JWT, OAuth2.
8. **Processamento Assíncrono:** Gerenciamento de tarefas assíncronas.

---

## Requirements


### *Must Have*

* Centralização dos Exames, Interoperabilidade, Certificação Digital, Segurança e Privacidade, Processamento Assíncrono.

### *Should Have*

* Digitalização e OCR, Webhooks, Interface Gráfica.

### *Could Have*

* Integração com Nuvem, Automação de ETL, Notificações Inteligentes.

### *Won't Have*

* Prontuário Eletrônico Completo.

---

## Method

### Arquitetura Geral

O sistema será desenvolvido usando os princípios do **Domain-Driven Design (DDD)** e **Clean Architecture** para garantir modularidade, manutenibilidade e escalabilidade.

##  Camadas da Arquitetura

1. **Camada de Domínio:**
   - Contém as regras de negócio e lógicas fundamentais do sistema.
   - Modelos de Domínio: Entidades como `Patient`, `Anamnesis`, `Report`, `Exam`, `Doctor`, `Clinic`, que encapsulam comportamentos específicos.
   - Usaremos o conceito de **Aggregates** para gerenciar grupos de entidades que mudam de forma coesa.

2. **Camada de Aplicação:**
   - Orquestra as interações entre o domínio e as camadas externas.
   - **Use Cases**: Casos de uso específicos como `ArmazenarExame`, `ConsultarHistorico`, que representam a lógica da aplicação.
   - Implementação de serviços e interfaces para mediar entre o domínio e as camadas de infraestrutura.

3. **Camada de Infraestrutura:**
   - Inclui frameworks, bibliotecas, e componentes de infraestrutura.
   - Repositórios que implementam interfaces da camada de aplicação, por exemplo, para persistência no banco de dados.
   - Integração com APIs externas, como EHRs usando HL7/FHIR, e serviços de certificação digital.
   - Processos de ETL e gestão de webhooks para sincronização de dados.

4. **Camada de Interface de Usuário (UI):**
   - Implementada usando Next.js para fornecer uma interface responsiva e interativa.
   - Páginas e componentes React.js que se comunicam com a API desenvolvida em NestJS.
   - Representação gráfica dos dados (gráficos de evolução) usando bibliotecas como Chart.js ou D3.js.

---

## Fluxo de Dados

1. **Entrada de Dados:**
   - Dados de exames e anamnese são capturados via formulários e upload de documentos na interface Next.js.
   - Documentos digitalizados passam por OCR na camada de Infraestrutura para conversão em texto.

2. **Processamento e Persistência:**
   - O domínio processa as informações recebidas, aplicando regras de negócio, e solicita a camada de Infraestrutura para persistir dados em repositórios adequados.
   - Dados críticos, como exames, são armazenados em um banco de dados seguro com criptografia.
   - Processos assíncronos lidam com a carga de documentos digitalizados e integrações via ETL.

3. **Interoperabilidade:**
   - Integrações com sistemas de EHR são realizadas via APIs RESTful utilizando HL7 e FHIR.
   - Webhooks são configurados para receber notificações em tempo real de novos registros ou atualizações em sistemas externos.

4. **Autenticação e Autorização:**
   - A autenticação é gerida com JWT ou OAuth2, garantindo que apenas usuários autenticados e autorizados acessem os dados.
   - Certificação digital é usada para garantir a autenticidade nas interações com EHRs.

---

## Relacionamentos Atualizados

### Estrutura das Entidades com Tenant Discriminator

- PatientEntity
- DoctorEntity
- ClinicEntity
- AnamnesisEntity
- ExamEntity
- ReportEntity

o ID da Clínica será utilizada como tenant_id para garantir o isolamento dos dados por clínica.

1. *Patient*:
- *One-to-Many com Anamnesis:* Um `Patient` pode ter várias `Anamnesis`.
- *One-to-Many com Exam:* Um `Patient` pode ter vários `Exam`.
- *Many-to-Many com Clinic:* Um `Patient` pode estar associado a várias `Clinic`.


2. *Doctor:*
- *One-to-Many com Anamnesis:* Um `Doctor` pode realizar várias `Anamnesis`.
- *One-to-Many com Exam:* Um `Doctor` pode solicitar ou realizar vários `Exam`.
- *One-to-Many com Report:* Um `Doctor` pode emitir vários `Report` (relatórios) de exames.
- *Many-to-Many com Clinic:* Um `Doctor` pode atender a uma `Clinic`.


3. *Clinic:*
- *Many-to-Many com Patient:* Uma `Clinic` estar associada a vários `Patient`.
- *Many-to-Many com Doctor:* Uma `Clinic` pode ter vários `Doctor` associados.
- *One-to-Many com Exam:* Uma `Clinic` pode realizar vários `Exam`.
- *One-to-Many com Anamnesis:* Uma `Clinic` pode ter vários `Anamnesis`.
- *One-to-Many com Report:* Uma `Clinic` pode ter vários `Report`.



4. *Anamnesis:*
- *Many-to-One com Patient:* Uma `Anamnesis` estar associada a um `Patient`.
- *Many-to-One com Doctor:* Uma `Anamnesis` estar associada a um `Doctor`.
- *Many-to-One com Clinic:* Uma `Anamnesis` estar associada a uma `Clinic`.


5. *Exam:*
- *Many-to-One com Patient:* Um `Exam` estar associada a um `Patient`.
- *Many-to-One com Clinic:* Um `Exam` estar associado a um `Doctor`.
- *Many-to-One com Doctor:* Um `Exam` estar associado a um `Clinic`.
- *Many-to-Many com Report:* Um `Exam` estar associado a vários `Report`. (opiniões de múltiplos especialistas)


6. *Report:*
- *Many-to-One com Patient:* Um `Report` estar associada a um `Patient`.
- *Many-to-One com Doctor:* Um `Report` estar associada a `Doctor`.
- *Many-to-Many com Exam:* Um `Report` estar associada vários `Exam`.

`Patient` ↔ `Doctor`: Relacionamento indireto, mediado por `Clinic`.
`Patient` ↔ `Report`: Relacionamento indireto através de `Exam`.



### Explicação dos Relacionamentos e Isolamento por Tenant

1. Tenant Context: 
- Cada clínica é um (tenant). Todas as operações de leitura e gravação são filtradas por esse tenant, garantindo que os dados sejam isolados por clínica.

2. Shared Database: 
- Todas as clínicas compartilham o mesmo banco de dados físico, mas os dados são logicamente separados pelo tenant, o que simplifica o gerenciamento e a escalabilidade.

3. Bounded Contexts:

- Gestão de Pacientes: O PatientEntity é o Aggregate Root no contexto de "Gestão de Pacientes".
- Gestão de Médicos: O DoctorEntity é o Aggregate Root no contexto de "Gestão de Médicos".

Esses contextos são isolados e interagem de forma controlada, utilizando o tenant(id_clinic) para garantir que as interações entre pacientes e médicos sejam filtradas corretamente.

4. Service Layer e Tenant Filtering:

- Todas as operações realizadas pela camada de serviço devem sempre passar o tenant(id_clinic) para garantir que apenas os dados da clínica atual sejam acessados ou manipulados.

5. Tabelas de Junção e Chaves Estrangeiras:

- Tabela de Junção: Relacionamentos muitos-para-muitos, como entre médicos e clínicas, são modelados com tabelas de junção (doctor_clinics, patient_clinics).
- Chaves Estrangeiras: As chaves estrangeiras garantem a integridade referencial e asseguram que os dados estejam corretamente associados ao tenant.

---

## Tecnologias Utilizadas

1. **Framework Backend:**
   - Nestjs
   - Backend modular e extensível.
   - Suporte para arquitetura limpa e orientação a DDD.
   - Implementação de serviços RESTful para comunicação com o frontend e sistemas externos.

2. **Framework voltado para React:**
   - Next.js

3. **Banco de Dados:**
   - Banco de dados relacional como PostgreSQL para armazenar dados estruturados.
   - Banco de dados NoSQL como MongoDB para leitura dos dados.
   - Implementação de criptografia em repouso para dados sensíveis.

4. **NoSQL**
   - MongoDB
   - Redis

5. **Software de Mensagens**
   - RabbitMQ

6. **OCR:**
   - Biblioteca Tesseract.js para OCR e conversão de laudos em texto pesquisável.

7. **Keycloak**
   - Keycloak fornece uma solução completa para autenticação, gerenciamento de usuários e controle de acesso.

8. **JWT**
   - Os tokens JWT permitem autenticação sem estado e escalável, com a capacidade de incluir informações de controle de acesso.

9. **Chart.js/D3.js:**
   - Utilizadas para a geração de gráficos de evolução dos exames na interface de usuário.


---

