FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["FinApp.Api/FinApp.Api.csproj", "FinApp.Api/"]
RUN dotnet restore "FinApp.Api/FinApp.Api.csproj"
COPY . .
WORKDIR "/src/FinApp.Api"
RUN dotnet build "FinApp.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish 
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "FinApp.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish 

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "FinApp.Api.dll" ]
