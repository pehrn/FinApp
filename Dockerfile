# Stage: SDK with Watch for Development
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev

WORKDIR /app

# Copy project file and restore dependencies
COPY ./FinApp.Api/FinApp.Api.csproj ./FinApp.Api/
RUN dotnet restore ./FinApp.Api/FinApp.Api.csproj

# Copy the rest of the source
COPY . .

WORKDIR /app/FinApp.Api

# Entry point for development: dotnet watch
CMD ["dotnet", "watch", "--project", "FinApp.Api.csproj", "run", "--urls=http://0.0.0.0:5000"]