package hr.project.api.dto;

import java.util.List;

import javax.validation.constraints.NotEmpty;

public class BulkDeleteIds {

    @NotEmpty
    private List<Long> ids;

    public List<Long> getIds() {
        return this.ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }
    
}
