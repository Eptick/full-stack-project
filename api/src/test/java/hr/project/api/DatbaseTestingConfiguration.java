package hr.project.api;

import javax.sql.DataSource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.jmx.support.RegistrationPolicy;
import org.testcontainers.containers.PostgreSQLContainer;

import static java.lang.String.format;

@Configuration
@EnableMBeanExport(registration = RegistrationPolicy.REPLACE_EXISTING)
public class DatbaseTestingConfiguration {
    private static PostgreSQLContainer postgreSQLContainer =(PostgreSQLContainer) new PostgreSQLContainer(
        "postgres:11.3")
        .withDatabaseName("project")
        .withUsername("postgres")
        .withPassword("postgres");


    @Bean
    public DataSource dataSource() {
        HikariConfig dsConfig = new HikariConfig();
        postgreSQLContainer.start();
        dsConfig.setJdbcUrl(format("jdbc:postgresql://%s:%s/%s",
                postgreSQLContainer.getContainerIpAddress(),
                postgreSQLContainer.getMappedPort(PostgreSQLContainer.POSTGRESQL_PORT),
                postgreSQLContainer.getDatabaseName()));
        dsConfig.setUsername(postgreSQLContainer.getUsername());
        dsConfig.setPassword(postgreSQLContainer.getPassword());
        dsConfig.setSchema("test");
        dsConfig.setDriverClassName("org.postgresql.Driver");
        dsConfig.setMaximumPoolSize(5);
        dsConfig.setMinimumIdle(2);
        return new HikariDataSource(dsConfig);
    }


    @Bean
    @Autowired
    public DSLContext dsl(DataSource dataSource) {
        org.jooq.Configuration configuration = new org.jooq.impl.DefaultConfiguration()
                .set(dataSource)
                .set(SQLDialect.POSTGRES);
        return DSL.using(configuration);
    }
}
